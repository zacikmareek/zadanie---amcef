import React, { useState, useEffect } from "react";
import { Table } from "../components/Table";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { faker } from '@faker-js/faker';
import { toast } from "react-toastify";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [nextButton, setNextButton] = useState(true);
  const [prevButton, setPrevButton] = useState(false);

  useEffect(() => {
    const cookie = getCookie("auth");
    if (!cookie) {
      router.push("/login");
    };

    const fetchUsers = async () => {
      await axios.get(`http://localhost:8080/api/users/${currentPage}/get/${limit}`)
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch(() => {
          toast(`${t('contacts_error')}`, { autoClose: 3000, type: 'error' });
        });
    };
    fetchUsers();
  }, []);

  const getUsers = async (value) => {
    if(value === 'prev' && currentPage !== 1){
      setCurrentPage(currentPage - 1);
      await axios.get(`http://localhost:8080/api/users/${currentPage}/get/${limit}`)
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch(() => {
          toast(`${t('contacts_error')}`, { autoClose: 3000, type: 'error' });
        });
    };
    if(value === 'prev' && currentPage === 1){
      setPrevButton(false);
      toast(`${t('first_page')}`, { autoClose: 3000, type: 'error' });
    };
    if(value === 'next'){
      setCurrentPage(currentPage + 1);
      await axios.get(`http://localhost:8080/api/users/${currentPage}/get/${limit}`)
        .then((response) => {
          if(response.data.users.length > 0){
            setUsers(response.data.users);
            setNextButton(true);
            setPrevButton(true);
            return;
          }
          setUsers(response.data.users);
          setNextButton(false);
        })
        .catch((err) => {
          toast(`${t('contacts_error')}`, { autoClose: 3000, type: 'error' });
        });
    }
  };

  const columns = [
    {
      Header: t('first_name'),
      accessor: "first_name",
    },
    {
      Header: t('last_name'),
      accessor: "last_name",
    },
    {
      Header: t('email_address'),
      accessor: "email_address",
    },
  ]

  // const registerUsers = async () => {
  //   for(let i = 0; i < 10000; i++){
  //     const data = {
  //       first_name: faker.name.firstName(),
  //       last_name: faker.name.lastName(),
  //       email_address: faker.internet.email(),
  //       phone_number: faker.phone.phoneNumber(),
  //       password: faker.internet.password(),
  //       address: faker.address.city(),
  //       zip: faker.address.zipCode(),
  //       country: faker.address.country(),
  //       note: faker.random.words(),
  //       role: 'admin'
  //     }

  //     const response = await axios.post('http://localhost:8080/api/register', data);
  //     console.log(response);
  //   }
  // };

  const data = users.map(user => ({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email_address: user.email_address,
  }));

  const handleClick = (row) => {
    const id = row.original.id;
    router.push({ pathname: "/users/[id]", query: { id: id } });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-screen-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Table columns={columns} data={data} onRowClick={handleClick} />
              {prevButton === true ? 
                <button
                onClick={() => getUsers('prev')}
                className="flex justify-start py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('previousButton')}
                </button>
              :
              <button
                onClick={() => getUsers('prev')}
                disabled={!prevButton}
                className="flex justify-start py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('previousButton')}
              </button>
              }

              {nextButton === true ? 
                <button
                onClick={() => getUsers('next')}
                className="flex mt-6 justify-end py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('nextButton')}
              </button>
              :
              <button
                onClick={() => getUsers('next')}
                disabled={!nextButton}
                className="flex mt-6 justify-end py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('nextButton')}
              </button>
              }
          </div>
        </div>
      </div>
    </>
  );
}
