import React from 'react'

const Navbar = ({searchText , setSearchText }) => {
  return (
      <div>
          <nav className="navbar">
          <ul>
            <li>
              <div className="content">
                <i class="fa-sharp fa-solid fa-pen-to-square noto_icon"></i>
                <h1 className="heading">NotoPedia</h1>
              </div>
            </li>
            <div></div>
            {
              <li className="search">
                <div>
                  <input
                    type="text"
                    className="search_input"
                    placeholder="Search ..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                  {searchText.length > 0 ? (
                    <i
                      className="fa-solid fa-xmark close_search"
                      onClick={(e) => setSearchText("")}
                    ></i>
                  ):''}
                </div>
              </li>
            }
            <li>
              {searchText.length < 1 ? (
                <i
                  className="fa-sharp fa-solid fa-magnifying-glass search_icon"
                ></i>
              ):''}
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar