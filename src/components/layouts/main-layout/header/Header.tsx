import { HeaderMenu } from './HeaderMenu/HeaderMenu'
import { Logo } from './Logo/Logo'
import { SearchInput } from './SearchInput/SearchInput'

export function Header() {
  return (
    <header className='p-5 gap-x-4 flex items-center bg-white border-b'>
      <Logo />
      <div className='ml-auto hidden w-[40%] lg:block'>
        <SearchInput />
      </div>
      <HeaderMenu />
    </header>
  )
}
