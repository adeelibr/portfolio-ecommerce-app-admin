import { CircleLoader } from 'react-spinners'

const Spinner = ({ size = 40 }) => {
  return <CircleLoader size={size} loading color="#36d7b7" />
}

export default Spinner
