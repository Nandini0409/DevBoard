const Header = (showName) => {
  return (
    <header className="bg-[#FAF5E9] relative px-9 py-4">
      <div className="absolute inset-0 bg-[#FFEDD5]/40 "></div>

      <nav className="relative z-10">
        <ul className="flex justify-between items-center sm:px-6 text-[white]">
          <li>
            <img src="/logo3.png" width={100} alt="DevBoard Logo" />
          </li>
          <li>
            {showName
              ? <p>Nandini Dixit</p>
              : <button className="bg-[#1b5748] hover:bg-[#316961e7] text-white rounded-full text-lg font-bold shadow-lg hover:shadow-md transition w-30 py-2">Signup</button>
            }
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header



