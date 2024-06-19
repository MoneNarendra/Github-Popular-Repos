import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const status = {
  initial: 'InItial',
  progress: 'Progress',
  success: 'Success',
  failed: 'Failed',
}

class GithubPopularRepos extends Component {
  state = {activeId: languageFiltersData[0].id, presentStatus: status.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({presentStatus: status.progress})
    const {activeId} = this.state
    const githubReposApiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    try {
      const response = await fetch(githubReposApiUrl)
      const data = await response.json()

      if (response.ok === true) {
        const popularRepos = data.popular_repos

        const updatedData = popularRepos.map(eachData => ({
          name: eachData.name,
          id: eachData.id,
          issuesCount: eachData.issues_count,
          forksCount: eachData.forks_count,
          starsCount: eachData.stars_count,
          avatarUrl: eachData.avatar_url,
        }))
        this.setState({
          repositryData: updatedData,
          presentStatus: status.success,
        })
      } else {
        this.setState({presentStatus: status.failed})
      }
    } catch (error) {
      this.setState({presentStatus: status.failed})
      console.log(error.message)
    }
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepostrys = () => {
    const {repositryData} = this.state
    return (
      <ul className="lists-repositries-constiners">
        {repositryData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} eachRepo={eachRepo} />
        ))}
      </ul>
    )
  }

  renderFailedView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failed-img"
      />
    </div>
  )

  renderRepostrysResult = presentStatus => {
    switch (presentStatus) {
      case 'Success':
        return this.renderRepostrys()
      case 'Failed':
        return this.renderFailedView()
      default:
        return this.renderLoading()
    }
  }

  changeActiveId = id => {
    this.setState(
      {activeId: id, presentStatus: status.progress},
      this.componentDidMount,
    )
  }

  render() {
    const {presentStatus, activeId} = this.state

    return (
      <div className="github-bg-container">
        <h1 className="github-heading">Popular</h1>
        <ul className="filter-contianer">
          {languageFiltersData.map(eachlanguage => (
            <LanguageFilterItem
              eachlanguage={eachlanguage}
              key={eachlanguage.id}
              activeId={activeId}
              changeActiveId={this.changeActiveId}
            />
          ))}
        </ul>
        <div className="repositrys-contianer">
          {this.renderRepostrysResult(presentStatus)}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
