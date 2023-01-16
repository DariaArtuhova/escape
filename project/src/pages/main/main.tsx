import {Filter} from '../../components/filter/filter';
import {useAppDispatch, useAppSelector} from '../../store';
import {QuestList} from '../../components/quest-list/quest-list';
import {useEffect} from 'react';
import {fetchQuestsAction} from '../../services/api-actions';
import {getAllQuests} from '../../store/quest/quest-selector';

export function Main(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestsAction());
  }, [dispatch]);

  const questsList = useAppSelector(getAllQuests);

  return (
    <div className="wrapper">
      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
            </h1>
            <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
          </div>
          <Filter />
          <h2 className="title visually-hidden">Выберите квест</h2>
          <QuestList quests={questsList}/>
        </div>
      </main>
    </div>
  );
}
