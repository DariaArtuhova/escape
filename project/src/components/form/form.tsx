import { useState} from 'react';
import {BookingQuest, BookingType, QuestType} from '../../types/booking-type';
import {useAppDispatch, useAppSelector} from '../../store';
import { sendNewBooking} from '../../services/api-actions';
import {useNavigate} from 'react-router-dom';
import {getCurrentQuest, getCurrentQuestBooking} from '../../store/quest/quest-selector';
import {AppRoute, LOCATION_COUNT_ID, PEOPLE_COUNT_DEFAULT} from '../../const';
import Map from '../map/map';
import {useForm} from 'react-hook-form';

type BookingProps = {
  questId: number;
}

export function Form({questId}: BookingProps) : JSX.Element {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const locationList = useAppSelector(getCurrentQuestBooking) as BookingType;
  const currentQuest = useAppSelector(getCurrentQuest) as QuestType;
  const { register, handleSubmit, formState: { errors } } = useForm();


  type NewReview = Pick<BookingQuest, 'date' | 'time' | 'phone' | 'contactPerson' | 'withChildren' | 'peopleCount' | 'locationId' >;

  const [booking, setBooking] = useState<NewReview>({
    date: '',
    time: '',
    phone: '',
    peopleCount: PEOPLE_COUNT_DEFAULT,
    contactPerson: '',
    withChildren: true,
    locationId: LOCATION_COUNT_ID
  });

  const onSubmit = async () => {
    await dispatch(sendNewBooking({
      questId: questId,
      date: booking.date,
      time: booking.time,
      phone: booking.phone,
      peopleCount: booking.peopleCount,
      contactPerson: booking.contactPerson,
      withChildren: booking.withChildren,
      locationId: booking.locationId
    }));
    navigate(AppRoute.MyBooking);

  };

  return (
    <>
      <div className="page-content__title-wrapper">
        <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
        </h1>
        <p className="title title--size-m title--uppercase page-content__title">{currentQuest?.title}</p>
      </div>
      <div className="page-content__item">
        <div className="booking-map">
          <div className="map">
            <div className="map__container">
              <Map address={locationList.locations} points={[locationList]} selectedPoint={locationList} />
            </div>
          </div>
          <p className="booking-map__address">Вы выбрали:<br/></p>
        </div>
      </div>
      <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post"
        // eslint академии ошибочно выдает предупреждение()
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit = {
          handleSubmit(onSubmit)
        }
      >
        <fieldset className="booking-form__section">
          <legend className="visually-hidden">Выбор даты и времени</legend>
          {errors.date?.type === 'required' && <><br/><span role="alert">Укажите время</span></>}
          <fieldset className="booking-form__date-section">
            <legend className="booking-form__date-title">Сегодня</legend>
            <div className="booking-form__date-inner-wrapper">
              {
                locationList.slots.today.map(({time, isAvailable}) => (
                  <label className="custom-radio booking-form__date" key={`today${time}`}>
                    <input type="radio" id={`today${time}`} disabled={!isAvailable} value={time}
                      {...register('date', {required: true, })}
                      onChange={ (evt) => setBooking({...booking, time: evt.target.value, date: 'today'})}
                      aria-invalid={errors.date ? 'true' : 'false'}
                    />
                    <span className="custom-radio__label">{time}
                    </span>
                  </label>
                ))
              }
            </div>
          </fieldset>
          <fieldset className="booking-form__date-section">
            <legend className="booking-form__date-title">Завтра</legend>
            <div className="booking-form__date-inner-wrapper">
              {
                locationList.slots.tomorrow.map(({time, isAvailable}) => (
                  <label className="custom-radio booking-form__date" key={`tomorrow${time}`}>
                    <input type="radio" id={`tomorrow${time}`} disabled={!isAvailable} value={time}
                      {...register('date', {required: true,})}
                      onChange={ (evt) => setBooking({...booking, time: evt.target.value, date: 'tomorrow'})}
                      aria-invalid={errors.date ? 'true' : 'false'}
                    />
                    <span className="custom-radio__label">{time}
                    </span>
                  </label>
                ))
              }
            </div>
          </fieldset>
        </fieldset>
        <fieldset className="booking-form__section">
          <legend className="visually-hidden">Контактная информация</legend>
          <div className="custom-input booking-form__input">
            <label className="custom-input__label" htmlFor="name">Ваше имя</label>
            {errors.name?.type === 'required' && <><br/><span role="alert">Укажите имя</span></>}
            {errors.name && errors.name.message && <><p>Длина должна составлять от 1 до 15 символов</p> </>}
            <input type="text" id="name" placeholder="Имя"
              {...register('name',
                {
                  required: true,
                  pattern: /^[А-Яа-яЁёA-Za-z']/i,
                  minLength: {value: 1, message: 'error'},
                  maxLength: {value: 15, message: 'error'},
                })}
              onChange={(evt) => setBooking({...booking, contactPerson: evt.target.value})}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
          </div>
          <div className="custom-input booking-form__input">
            <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
            {errors.tel?.type === 'required' && <><br/><span role="alert">Укажите телефон</span></>}
            {errors.tel && errors.tel.message && <><p>Укажите телефон в указанном формате: +79999999999</p> </>}
            <input type="tel" id="tel" placeholder="Телефон"
              {...register('tel',
                {required: true,
                  pattern: {value: /^...+7[0-9]{8,}/i, message: 'error'},
                })}
              onChange={(evt) => setBooking({...booking, phone: evt.target.value})}
              aria-invalid={errors.tel ? 'true' : 'false'}
            />
          </div>
          <div className="custom-input booking-form__input">
            <label className="custom-input__label" htmlFor="person">Количество участников</label>
            {errors.person?.type === 'required' && <><br/><span role="alert">Укажите количество участников</span></>}
            {errors.person && errors.person.message && <><p>`Число участников должно быть от {currentQuest.peopleMinMax[0]} до {currentQuest.peopleMinMax[1]}`</p> </>}
            <input type="number" id="person" placeholder="Количество участников"
              {...register('person',
                {
                  required: true,
                  min: {value: currentQuest.peopleMinMax[0], message: 'error'},
                  max: {value: currentQuest.peopleMinMax[1], message: 'error'}})}
              onChange={(evt) => setBooking({...booking, peopleCount: Number(evt.target.value)})}

              aria-invalid={errors.person ? 'true' : 'false'}
            />
          </div>
          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
            <input type="checkbox" id="children" checked
              {...register('children',
                {required: false,
                })}
              onChange={(evt) => setBooking({...booking, withChildren: Boolean(evt.target.value)})}

            />
            <span className="custom-checkbox__icon">
              <svg width="20" height="17" aria-hidden="true">
                <use xlinkHref="#icon-tick"/>
              </svg>
            </span>
            <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
          </label>
        </fieldset>
        <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
        {errors.user?.type === 'required' && <><br/><span role="alert">Поставьте галочку</span></>}
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
          <input type="checkbox" id="id-order-agreement"
            {...register('user', {required: true })}
            aria-invalid={errors.user ? 'true' : 'false'}
          />
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"/>
            </svg>
          </span>
          <span className="custom-checkbox__label">Я&nbsp;согласен с
            <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
          </span>
        </label>
      </form>
    </>
  );
}
