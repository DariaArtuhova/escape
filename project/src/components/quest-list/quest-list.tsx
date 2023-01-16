import {Quest} from '../quest/quest';
import {useAppSelector} from '../../store';
import { QuestType} from '../../types/booking-type';
import {FilterLevel, FilterType} from '../../const';

type QuestProps = {
  quests: QuestType[];
}

export function QuestList({quests}:QuestProps) : JSX.Element {

  const typeFilter = useAppSelector((state) => state.quest.filterType);
  const levelFilter = useAppSelector((state) => state.quest.filterLevel);

  switch (typeFilter) {
    case FilterType.Adventures:
      quests = quests.filter((quest) => quest.type.startsWith('adventures'));
      break;
    case FilterType.Horror:
      quests = quests.filter((quest) => quest.type.startsWith('horror'));
      break;
    case FilterType.Mystic:
      quests = quests.filter((quest) => quest.type.startsWith('mystic'));
      break;
    case FilterType.Detective:
      quests = quests.filter((quest) => quest.type.startsWith('detective'));
      break;
    case FilterType.SciFi:
      quests = quests.filter((quest) => quest.type.startsWith('sci-fi'));
      break;
    case FilterType.All:
      break;
    default:
      break;
  }

  switch (levelFilter) {
    case FilterLevel.Easy:
      quests = quests.filter((quest) => quest.level.startsWith('easy'));
      break;
    case FilterLevel.Medium:
      quests = quests.filter((quest) => quest.level.startsWith('medium'));
      break;
    case FilterLevel.Hard:
      quests = quests.filter((quest) => quest.level.startsWith('hard'));
      break;
    case FilterLevel.All:
      break;
    default:
      break;
  }

  if (quests.length !== 0) {
    return (
      <div className="cards-grid">
        {quests.map((quest) => <Quest quest={quest} key={quest.id}/>)}
      </div>
    );
  } else {
    return (
      <h1>По данным фильтрам нет квестов</h1>
    );
  }
}
