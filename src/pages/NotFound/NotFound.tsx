import { centerd, flexer, spacer } from "../../constants/comon.styles"

const NotFound = () => (
    <div className={centerd+'h-screen w-screen'}>
      <div className={flexer}>
        <h1 className="text-4xl font-extrabold text-bblue">404</h1>
        <div className={spacer} />
        <div className="h-32 w-1 bg-gray-900" />
        <div className={spacer} />
        <div>
          <h4 className="font-semibold text-lg text-gray-900">Page Not Found</h4>
          <p className="text-bash text-base">This page doesn't exist or was removed!</p>
        </div>
      </div>
    </div>
  )


export default NotFound
