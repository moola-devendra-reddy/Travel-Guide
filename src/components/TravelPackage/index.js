import {
  PackageItem,
  PackageImage,
  PackageName,
  PackageDesc,
  PackageDetails,
} from './styledComponents'

const TravelPackage = props => {
  const {packageDetails} = props

  const {imageUrl, name, description} = packageDetails

  return (
    <PackageItem>
      <PackageImage src={imageUrl} alt={name} />
      <PackageDetails>
        <PackageName>{name}</PackageName>
        <PackageDesc>{description}</PackageDesc>
      </PackageDetails>
    </PackageItem>
  )
}

export default TravelPackage
