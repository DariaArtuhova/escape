import {useAppDispatch, useAppSelector} from '../../store';
import {changeFilterType, changeType} from '../../store/quest/quest-action';
import {TYPES} from '../../const';
import {getActiveType} from '../../store/quest/quest-selector';

export function FilterType() : JSX.Element {
  const dispatch = useAppDispatch();
  const activeType = useAppSelector(getActiveType);

  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Тематика</legend>
      <ul className="filter__list">
        {TYPES.map((item ) => (
          <li className="filter__item"
            key={item.type}
            onClick={() => {
              dispatch(changeFilterType(item.type));
            }}
          >
            <input type="radio" name="type" id={item.id} checked={activeType === item.type}
              onChange={() => {
                dispatch(changeType({ all: item.type }));
              }}
            />
            <label className="filter__label" htmlFor={item.id}>
              <svg className="filter__icon" width="26" height="30" aria-hidden="true">
                <use xlinkHref={`#icon-${item.id}`}></use>
              </svg>
              <span className="filter__label-text">{item.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>

  );
}
