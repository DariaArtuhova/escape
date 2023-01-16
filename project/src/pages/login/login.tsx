import {useAppDispatch, useAppSelector} from '../../store';
import {AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user/user-selector';
import {Navigate, useNavigate} from 'react-router-dom';
import {AuthData} from '../../types/booking-type';
import {loginAction} from '../../services/api-actions';
import {SubmitHandler, useForm} from 'react-hook-form';


export function Login(): JSX.Element {
  const isAuth: boolean = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors}
  } = useForm<AuthData>({
    mode: 'onChange'
  });

  const onSubmit : SubmitHandler<AuthData> = (authData) => {
    dispatch(loginAction(authData));
    navigate(-1);
  };


  if (!isAuth) {
    return (
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp"
              srcSet="../project/public/img/content/maniac/ma../project/public/imgc-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
            />
            <img src="../project/public/img/content/maniac/maniac-size-m.jpg"
              srcSet="../project/public/img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt=""
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            <form className="login-form" method="post"
              action=""
              // eslint академии ошибочно выдает предупреждение()
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                    <input type="email" id="email" placeholder="Адрес электронной почты"
                      {...register('login', {
                        required: 'Заполните это поле',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Неверный адрес'
                        }
                      })}
                    />
                    <div className='error'>{errors?.login?.message}</div>
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input type="password" id="password" placeholder="Пароль"
                      {...register('password', {
                        required: 'Заполните это поле',
                        minLength: {
                          value: 3,
                          message: 'Пароль должен содержать хотя бы одну букву и цифру'
                        },
                        pattern: {
                          value: /^(?=.*\d)(?=.*[a-zA-Z]).*$/i,
                          message: 'Пароль должен содержать хотя бы одну букву и цифру'
                        }
                      })}
                    />
                    <div className='error'>{errors?.password?.message}</div>

                  </div>
                </div>
                <button className="btn btn--accent btn--general login-form__submit" type="submit">Войти</button>
              </div>
              <label className="custom-checkbox login-form__checkbox">
                <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
                <span className="custom-checkbox__icon">
                  <svg width="20" height="17" aria-hidden="true">
                    <use xlinkHref="#icon-tick" />
                  </svg>
                </span>
                <span className="custom-checkbox__label">Я&nbsp;согласен с
                  <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
                </span>
              </label>
            </form>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <Navigate to={'/'} />
    );
  }
}
