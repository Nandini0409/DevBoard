const Header = ({showName}) => {
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
              : <button className="bg-[#345f54] hover:bg-[#316961e7] text-white rounded-full text-md shadow-lg hover:shadow-md transition w-25 py-1.5">Signup</button>
            }
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header



