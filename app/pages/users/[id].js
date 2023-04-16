import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { toast } from "react-toastify";

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState({});
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const cookie = getCookie("auth");
    if (!cookie) {
      router.push("/login");
    };
    const id = router.query.id;

    const fetchCurrentUser = async () => {
      await axios.get(`http://localhost:8080/api/users/${id}/get`)
        .then((response) => {
          setCurrentUser(response.data.message);
        })
        .catch(() => {
          toast(`${t('fetch_user_error')}`, { autoClose: 3000, type: 'error' });
        });
    };

    fetchCurrentUser();
  }, []);

  const deleteUser = async () => {
    let confirmDelete = confirm(`${t('confirm_delete')}`);

    if(!confirmDelete){
      return;
    }

    await axios.delete(`http://localhost:8080/api/users/${currentUser.id}/delete`)
      .then(() => {
        toast(`${t('delete_confirmation')}`, { autoClose: 3000, type: 'success' });
        setTimeout(() => {
          router.push('/');
        }, 3000);
      })
      .catch(() => {
        toast(`${t('delete_error')}`, { autoClose: 3000, type: 'error' });
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName ? firstName : currentUser.first_name,
      last_name: lastName ? lastName : currentUser.last_name,
      email_address: email ? email : currentUser.email_address,
      phone_number: phoneNumber ? phoneNumber : currentUser.phone_number,
      address: address ? address : currentUser.address,
      zip: zip ? zip : currentUser.zip,
      country: country ? country : currentUser.country,
      note: note ? note : note === "" ? "" : currentUser.note,
      role: "admin",
    };

    await axios.put(`http://localhost:8080/api/users/${currentUser.id}/edit`, data)
      .then((response) => {
        toast(`${t('edit_confirmation')}`, { autoClose: 3000, type: 'success' });
        setTimeout(() => {
          router.push('/');
        }, 3000);
      })
      .catch(() => {
        toast(`${t('edit_error')}`, { autoClose: 3000, type: 'success' });
      })
    console.log(data);
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">{currentUser.first_name} {currentUser.last_name}</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2">{t('first_name')}</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                defaultValue={currentUser.first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">{t('last_name')}</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                defaultValue={currentUser.last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">{t('email_address')}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                defaultValue={currentUser.email_address}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">{t('phone_number')}</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                required
                defaultValue={currentUser.phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">{t('address')}</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                defaultValue={currentUser.address}
                onChange={(e) => setAddress(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">{t('country')}</label>
              <input
                id="country"
                name="country"
                type="text"
                required
                defaultValue={currentUser.country}
                onChange={(e) => setCountry(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">{t('zip')}</label>
              <input
                id="zip"
                name="zip"
                type="number"
                required
                defaultValue={currentUser.zip}
                onChange={(e) => setZip(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">{t('note')}</label>
              <textarea
                id="note"
                name="note"
                type="text"
                defaultValue={currentUser.note}
                onChange={(e) => setNote(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-4">
            <button 
              className="bg-blue-500 sm:ml-4 text-white py-2 px-8 rounded hover:bg-blue-700" 
              type="submit"
            >
              {t('save_button')}
            </button>
          </div>
          </div>
        </form>
        <div>
            <button 
              className="mt-4 sm:ml-4 bg-red-500 text-white py-2 px-8 rounded hover:bg-red-700" 
              onClick={() => deleteUser()}
            >
              {t('delete_button')}
            </button>
          </div>
      </div>
    </div>
    </>
  );
}
