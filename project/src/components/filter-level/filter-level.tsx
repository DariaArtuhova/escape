import {useAppDispatch, useAppSelector} from '../../store';
import {LEVELS} from '../../const';
import {changeFilterLevel, changeLevel} from '../../store/quest/quest-action';
import {getActiveLevel} from '../../store/quest/quest-selector';

export function FilterLevel() : JSX.Element {
  const activeLevel = useAppSelector(getActiveLevel);
  const dispatch = useAppDispatch();

  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Сложность</legend>
      <ul className="filter__list">
        {LEVELS.map((item) => (
          <li className="filter__item"
            key={item.name}
            onClick={() => {
              dispatch(changeFilterLevel(item.type));
            }}
          >
            <input type="radio" name="level" id={item.name} checked={activeLevel === item.name}
              onChange={(evt) => {
                dispatch(changeLevel({ any: item.name }));
              }}
            />
            <label className="filter__label" htmlFor={item.name}><span className="filter__label-text">{item.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
