import {Link, useParams} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {QuestType} from '../../types/booking-type';
import {useAppDispatch, useAppSelector} from '../../store';
import {useEffect} from 'react';
import {fetchCurrentQuestAction} from '../../services/api-actions';
import {getCurrentQuest} from '../../store/quest/quest-selector';
import {getAuthorizationStatus} from '../../store/user/user-selector';
import {Loading} from '../../components/loading/loading';

export function QuestPage(): JSX.Element {
  const {id} = useParams();

  const param = Number(id);
  const dispatch = useAppDispatch();
  const isAuth: boolean = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  useEffect(() => {
    dispatch(fetchCurrentQuestAction(param));
  }, [dispatch]);

  const currentQuest = useAppSelector(getCurrentQuest) as QuestType;

  if (currentQuest) {
    return (
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              srcSet={currentQuest.coverImg}
            />
            <img src={currentQuest.coverImg}
              srcSet={currentQuest.coverImg} width="1366" height="768" alt=""
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">{currentQuest.title}</h1>
            <p className="subtitle quest-page__subtitle">
              <span className="visually-hidden">Жанр:</span>{currentQuest.type}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width="11" height="14" aria-hidden="true">
                  <use href="#icon-person"></use>
                </svg>
                {currentQuest.peopleMinMax[0]}&ndash;{currentQuest.peopleMinMax[1]}&nbsp;чел
              </li>
              <li className="tags__item">
                <svg width="14" height="14" aria-hidden="true">
                  <use href="#icon-level"></use>
                </svg>
                {currentQuest.level}
              </li>
            </ul>
            <p className="quest-page__description">{currentQuest.description}</p>
            {
              isAuth ?
                <Link to={`${AppRoute.Quest}/${currentQuest.id}${AppRoute.Booking}`}
                  className="btn btn--accent btn--cta quest-page__btn"
                >Забронировать
                </Link>
                :
                <Link to={AppRoute.Login}
                  className="btn btn--accent btn--cta quest-page__btn"
                >Забронировать
                </Link>
            }
          </div>
        </div>
      </main>
    );
  } else {
    return <Loading/>;
  }
}
