import { useNavigate } from "react-router-dom"

const Header = ({showName}) => {
  const navigate = useNavigate()

  return (
    <header className="bg-[#FAF5E9] relative py-4">
      <div className="absolute inset-0 bg-[#FFEDD5]/40 "></div>

      <nav className="relative z-10">
        <ul className="flex justify-between items-center sm:px-6 text-[white]">
          <li>
            <img src="/images/logo3.png" width={80} alt="DevBoard Logo" />
          </li>
          <li>
            {showName===true
              ? <p>Nandini Dixit</p>
              : <button onClick={(e)=>{navigate('/userRegistration')}} className="bg-[#2a443d] hover:bg-[#316961e7] text-white rounded-full text-md shadow-lg hover:shadow-md transition w-25 py-1.5">Signup</button>
            }
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header



