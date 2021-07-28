/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Assets
import { ReactComponent as ChevronLeft } from 'assets/images/icons/chevron-left.svg';
import { ReactComponent as ChevronRight } from 'assets/images/icons/chevron-right.svg';
// Styles
import styles from './index.module.sass';

const Pagination = ({ className, pages, page, setPage }) => {
  const [visiblePages, setVisiblePages] = React.useState([]);

  const filterPages = (visiblePages, totalPages) =>
    visiblePages.filter((page) => page <= totalPages);

  const getVisiblePages = React.useCallback((page, pages) => {
    if (pages < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], pages);
    }
    if (page % 5 >= 0 && page > 4 && page + 3 < pages) {
      return [1, '...', page - 1, page, page + 1, '...', pages];
    }
    if (page % 5 >= 0 && page > 4 && page + 3 >= pages) {
      return [1, '...', pages - 4, pages - 3, pages - 2, pages - 1, pages];
    }
    return [1, 2, 3, 4, 5, '...', pages];
  }, []);

  React.useEffect(() => {
    setVisiblePages(getVisiblePages(page, pages));
  }, [page, pages, getVisiblePages]);

  const changePage = (activePage) => {
    if (activePage === page) {
      return;
    }
    setPage(activePage);
  };

  const handleArrowClick = (val, boundary) => {
    if (page === boundary) {
      return;
    }
    setPage(page + val);
  };

  const classes = cn(styles.pagination, className);

  return (
    <nav className={classes}>
      <ul className={styles['pagination-list']}>
        <li className={styles['pagination-item']}>
          <button
            type="button"
            className={cn(
              styles['pagination-button'],
              page === 1 && styles.disabled
            )}
            onClick={() => handleArrowClick(-1, 1)}
            disabled={page === 1}
          >
            <ChevronLeft className={styles['pagination-chevron']} />
          </button>
        </li>
        {visiblePages.map((p, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={idx} className={styles['pagination-item']}>
            {typeof p === 'string' ? (
              <button
                type="button"
                className={cn(styles['pagination-button'], styles.disabled)}
                disabled
              >
                {p}
              </button>
            ) : (
              <button
                type="button"
                className={cn(
                  styles['pagination-button'],
                  page === p && styles.active
                )}
                onClick={() => changePage(p)}
              >
                {p}
              </button>
            )}
          </li>
        ))}
        <li className={styles['pagination-item']}>
          <button
            type="button"
            className={cn(
              styles['pagination-button'],
              page === 1 && styles.disabled
            )}
            onClick={() => handleArrowClick(1, pages)}
            disabled={page === pages}
          >
            <ChevronRight className={styles['pagination-chevron']} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.defaultProps = {
  className: '',
};

Pagination.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;
