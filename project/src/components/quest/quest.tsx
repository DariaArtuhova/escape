import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import { QuestType} from '../../types/booking-type';

type QuestComponentProps = {
  quest: QuestType;
}

export function Quest(props : QuestComponentProps) {
  const {quest} = props;
  const { id, previewImg, level, title, peopleMinMax } = quest;
  return (
    <div className="quest-card" id={id.toString()}>
      <div className="quest-card__img">
        <picture>
          <source type="image/webp"
            srcSet={previewImg}
          />
          <img src={previewImg} srcSet={previewImg} width="344" height="232" alt="Мужчина в клетке в подземелье."/>
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link to={`${AppRoute.Quest}/${quest.id}`} className="quest-card__link">{title}</Link>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>
            {peopleMinMax[0]}&ndash;{peopleMinMax[1]}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>
            {level}
          </li>
        </ul>
      </div>
    </div>
  );
}
