import { useSearchParams } from 'react-router-dom'
import SignupFlow from './SignupFlow'

export default function InvitePage() {
  const [searchParams] = useSearchParams()

  const initialData = {
    firstName:  searchParams.get('firstName')  || '',
    lastName:   searchParams.get('lastName')   || '',
    middleName: searchParams.get('middleName') || '',
    email:      searchParams.get('email')      || '',
  }

  return <SignupFlow initialData={initialData} />
}
