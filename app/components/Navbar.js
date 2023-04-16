import Link from "next/link";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { setCookie, deleteCookie } from "cookies-next";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  
  const changeLanguage = (event) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setCookie("lang", newLanguage);
  };

  const logout = async () => {
    await axios.get('http://localhost:8080/api/logout')
      .then(() => {
        toast(`${t('logout_success')}`, { autoClose: 3000, type: 'success' });
        deleteCookie('auth');
        router.push('/login');
      })
      .catch(() => {
        toast(`${t('logout_error')}`, { autoClose: 3000, type: 'error' });
      });
  };

  return (
    <nav className="py-4 flex justify-between">
      <Link href={'/'}>
        <h1 className="text-xl px-4 cursor-pointer">Test company</h1>
      </Link>
      <ul className="flex items-center">
      <li>
        <select value={i18n.language} onChange={changeLanguage}>
          <option value="en">EN</option>
          <option value="sk">SK</option>
        </select>
      </li>
        <li>
          <button
            className="font-bold px-4 rounded"
            type="button"
            onClick={() => logout()}
          >
            <FiLogOut
              className="cursor-pointer text-2xl"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
