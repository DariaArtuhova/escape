import {Form} from '../../components/form/form';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store';
import {BookingType, QuestType} from '../../types/booking-type';
import {getCurrentQuest, getCurrentQuestBooking} from '../../store/quest/quest-selector';
import {fetchCurrentQuestAction, fetchCurrentQuestBooking} from '../../services/api-actions';
import {Loading} from '../../components/loading/loading';

export function Booking() : JSX.Element {
  const { id } = useParams();

  const param = Number(id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentQuestAction(param));
    dispatch(fetchCurrentQuestBooking(param));
  }, [dispatch]);

  const currentQuest = useAppSelector(getCurrentQuest) as QuestType;

  const locationList = useAppSelector(getCurrentQuestBooking) as BookingType;

  if (currentQuest && locationList !== null) {

    return (
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp"
              srcSet={currentQuest?.coverImg}
            />
            <img src={currentQuest?.coverImg}
              srcSet={currentQuest?.coverImg} width="1366" height="1959"
              alt=""
            />
          </picture>
        </div>
        <div className="container container--size-s">
          <Form questId={currentQuest.id} />
        </div>
      </main>
    );
  } else {
    return (
      <Loading />
    );
  }
}
