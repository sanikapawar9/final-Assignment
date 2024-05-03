import { Pagination as Paginate} from 'react-bootstrap';
import classes from './Pagination.module.css'

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.page}>
      <Paginate>
        {pageNumbers.map((number) => (
          <Paginate.Item
            key={number}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </Paginate.Item>
        ))}
      </Paginate>
    </div>
  );
};

export default Pagination;