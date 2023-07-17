import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TravelPackage from '../TravelPackage'

import {
  TravelGuideContainer,
  Heading,
  PackagesContainer,
  LoaderContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    travelPackages: [],
  }

  componentDidMount() {
    this.getTravelPackages()
  }

  getTravelPackages = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const travelUrl = 'https://apis.ccbp.in/tg/packages'

    const travelResponse = await fetch(travelUrl)

    if (travelResponse.ok === true) {
      const travelPackages = await travelResponse.json()

      const formattedTravelPackages = travelPackages.packages.map(
        eachPackage => ({
          name: eachPackage.name,
          id: eachPackage.id,
          description: eachPackage.description,
          imageUrl: eachPackage.image_url,
        }),
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        travelPackages: formattedTravelPackages,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="TailSpin" height={50} width={50} color="#52bbf0" />
    </LoaderContainer>
  )

  renderPackages = () => {
    const {travelPackages} = this.state

    return (
      <PackagesContainer>
        {travelPackages.map(eachPackage => (
          <TravelPackage packageDetails={eachPackage} key={eachPackage.id} />
        ))}
      </PackagesContainer>
    )
  }

  renderApiStatusResults = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderPackages()

      default:
        return null
    }
  }

  render() {
    return (
      <TravelGuideContainer>
        <Heading>Travel Guide</Heading>
        {this.renderApiStatusResults()}
      </TravelGuideContainer>
    )
  }
}

export default TravelGuide
