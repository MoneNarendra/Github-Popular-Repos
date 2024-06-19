import './index.css'

const LanguageFilterItem = props => {
  const {eachlanguage, activeId, changeActiveId} = props
  const {language, id} = eachlanguage
  const changeFilter = () => {
    changeActiveId(id)
  }

  const activeClass = activeId === id ? 'active-filter' : ''
  return (
    <li>
      <button
        className={`filter-btn ${activeClass}`}
        type="button"
        onClick={changeFilter}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
