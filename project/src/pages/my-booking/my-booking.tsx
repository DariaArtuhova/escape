import {useAppDispatch, useAppSelector} from '../../store';
import {loadMyBooking} from '../../store/quest/quest-selector';
import {deleteMyBooking} from '../../services/api-actions';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user/user-selector';

export function MyBooking(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuth: boolean = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  const myBooking = useAppSelector(loadMyBooking);

  if (myBooking.length !== 0 && isAuth) {
    return (
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp"
              srcSet={'../project/public/img/content/maniac/mania../project/public/imgg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x'}
            />
            <img src="../project/public/img/content/maniac/maniac-bg-size-m.jpg"
              srcSet="../project/public/img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959"
              alt=""
            />
          </picture>
        </div>
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
          </div>
          <div className="cards-grid">
            {
              myBooking.map(({id, date,time, quest,peopleCount,locations}) => (
                <div className="quest-card" key={id}>
                  <div className="quest-card__img">
                    <picture>
                      <source type="image/webp"
                        srcSet={quest.previewImg}
                      />
                      <img src={quest.previewImg}
                        srcSet={quest.previewImg} width="344" height="232"
                        alt="Мужчина в маске в тёмном переходе."
                      />
                    </picture>
                  </div>
                  <div className="quest-card__content">
                    <div className="quest-card__info-wrapper">
                      <Link to={`${AppRoute.Quest}/${quest.id}`} className="quest-card__link" >{quest.title}
                      </Link>
                      <span
                        className="quest-card__info"
                      >
                        {date},&nbsp;{time}
                        {/*{locations[0].address}*/}
                      </span>
                    </div>
                    <ul className="tags quest-card__tags">
                      <li className="tags__item">
                        <svg width="11" height="14" aria-hidden="true">
                          <use href="#icon-person"></use>
                        </svg>
                        {peopleCount}&nbsp;чел
                      </li>
                      <li className="tags__item">
                        <svg width="14" height="14" aria-hidden="true">
                          <use href="#icon-level"></use>
                        </svg>
                        {quest.level}
                      </li>
                    </ul>
                    <button className="btn btn--accent btn--secondary quest-card__btn" type="button" onClick={()=> {
                      dispatch(deleteMyBooking(id));
                    }}
                    >Отменить
                    </button>
                  </div>
                </div>

              ))
            }
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <h1>Нет забронированных квестов</h1>
    );
  }
}
