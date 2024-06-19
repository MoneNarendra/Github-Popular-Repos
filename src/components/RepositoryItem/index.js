import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {name, avatarUrl, starsCount, forksCount, issuesCount} = eachRepo
  return (
    <li className="each-repo-item">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="item-couts-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="couts-imgs"
        />
        <p className="count-headings">{`${starsCount} stars`}</p>
      </div>
      <div className="item-couts-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="couts-imgs"
        />
        <p className="count-headings">{`${forksCount} forks`}</p>
      </div>
      <div className="item-couts-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="couts-imgs"
        />
        <p className="count-headings"> {`${issuesCount} open issuess`}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
