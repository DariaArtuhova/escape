import {FilterType} from '../filter-type/filter-type';
import {FilterLevel} from '../filter-level/filter-level';

export function Filter() : JSX.Element {
  return (
    <div className="page-content__item">
      <form className="filter" action="#" method="get">
        <FilterType />
        <FilterLevel />
      </form>
    </div>
  );
}
