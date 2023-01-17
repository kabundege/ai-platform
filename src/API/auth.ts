import { Fetcher } from '../helpers/Fetcher'

const Base_URL  = 'http://localhost:2000'

interface SignInCreds {
    phone:string,
    password:string
}

export const SigninApi: (cred:SignInCreds) => Promise<any> = (credentials) => {
    return Fetcher(`${Base_URL}/auth/signin`,'POST',credentials)
}

interface SignUpCreds {
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
}

export const SignupApi: (creds:SignUpCreds) => Promise<any> = (credentials) => {
    return Fetcher(`${Base_URL}/auth/signup`,'POST',credentials)
}
