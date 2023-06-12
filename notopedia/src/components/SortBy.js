import React from 'react'

const SortBy = ({sortBy , setSortBy}) => {
  return (
      <div className="sort_contain">
        <label className="sort_by">Sort by </label>
        <i class="fa-solid fa-sort sort_icon"></i>
        <select
          className="dropdown"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="none">None</option>
          <option value="title">Title</option>
          <option value="dateCreated">Date Created</option>
          <option value="dateModified">Date Modified</option>
        </select>
      </div>
  )
}

export default SortBy