import React, { Component, PropTypes } from 'react';
import range from  'lodash/range';
import uniqueId from  'lodash/uniqueId';

import styles from "./styles.less";

class Pagination extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    onGetPageUrl: PropTypes.func.isRequired,
    pageCount: PropTypes.number.isRequired,
    previousLabel: PropTypes.node,
    nextLabel: PropTypes.node,
    onPageChange: PropTypes.func
  };

  handleInputPageNumber = () => {
    const number = this.pageNumber.value;
    if (!number) {
      return;
    }
    this.pageNumber.value = number.replace(/[^0-9]/, '');
  };

  handleSubmitPageNumber = (e) => {
    e.preventDefault();
    const { pageCount, router, onGetPageUrl } = this.props;
    const { target: form } = e;
    const pageNumber = parseInt(form["number"].value, 10);
    const url = onGetPageUrl(pageNumber);
    if (pageNumber > 0 && pageNumber <= pageCount) {
      router.push(url);
    }
    form["number"].value = '';
    form["number"].blur();
  };

  pageNumbersArray = () => {
    const { currentPage, pageCount, onGetPageUrl, onPageChange } = this.props;

    let pageArray = range(1, pageCount + 1);
    if ((pageCount - 7) > 0) {
      let totalPagesToShow = 7;
      totalPagesToShow = currentPage == 1 || currentPage == pageCount ? totalPagesToShow - 2 : totalPagesToShow - 3;
      let indL = currentPage,  indR = currentPage;
      const makeStep = () => {
        indL--;
        indR++;
        if (indL <= 1) {
          indR++;
          indL++;
        }
        if (indR >= pageCount) {
          indL--;
          indR--;
        }
      };
      makeStep();
      makeStep();
      const rest = totalPagesToShow - (currentPage - indL) - (indR - currentPage);
      if (currentPage - indL > indR - currentPage) {
        indL -= rest;
      }
      if (indR - currentPage > currentPage - indL) {
        indR += rest;
      }
      pageArray.fill(0, 1, indL - 1);
      pageArray.fill(0, indR, pageCount - 1);
      pageArray = pageArray.filter((el, index, arr) => {
        return !(arr[index + 1] == el);
      });
    }
    return pageArray.map((el) => {
      if (el === currentPage) {
        return <span key={uniqueId()} className="pagination__item active">{el}</span>;
      }
      const link = onGetPageUrl(el);
      if (el == 0) {
        return <span key={uniqueId()} className="pagination__item pagination__item--dots">...</span>;
      }
      return <a key={uniqueId()} href={link} className="pagination__item" onClick={this.onPageClick(el)}>{el}</a>;
    });
  };

  decreasePage = () => {
    const { currentPage, onGetPageUrl } = this.props;
    const page = currentPage > 1 ? currentPage - 1 : 1;
    return onGetPageUrl(page);
  };

  increasePage = () => {
    const { currentPage, onGetPageUrl } = this.props;
    return onGetPageUrl(currentPage + 1);
  };

  onPageClick = (page) => (e) => {
    const { onPageChange } = this.props;
    if (onPageChange) {
      onPageChange(page);
    }
  };

  render() {
    const { currentPage, pageCount, LinkToPrev, LinkToNext } = this.props;

    if (pageCount === 0) {
      return null;
    }

    return (
      <div className="pagination">
        {currentPage == 1
          ?
          <span className="pagination__item pagination__item--disabled pagination__item--prev" title="Previous Page">
            <LeftArrow />
          </span>
          :
          <a href={this.decreasePage()} disabled className="pagination__item pagination__item--prev" title="Previous Page">
            <LeftArrow />
          </a>
        }
        {currentPage == pageCount
          ?
          <span className="pagination__item pagination__item--disabled pagination__item--next" title="Next Page">
              <RightArrow />
            </span>
          :
          <a href={this.increasePage()} className="pagination__item pagination__item--next" title="Next Page">
            <RightArrow />
          </a>
        }
        {this.pageNumbersArray()}
        <form action="#" onSubmit={this.handleSubmitPageNumber} className="pagination__form">
          <input name="number" ref={(el) => this.pageNumber = el} placeholder="Page #" className="pagination__input" onChange={this.handleInputPageNumber} />
        </form>
      </div>
    );
  }
}

export default Pagination;

const LeftArrow = () => {
  return (
    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
      <path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" fill="currentColor" />
    </svg>
  )
};

const RightArrow = () => {
  return (
    <svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
      <path d="M1171 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" fill="currentColor" />
    </svg>
  )
};
