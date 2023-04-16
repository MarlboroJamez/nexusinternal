import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Hooks
import useEncryptedCookie from '../../../hooks/cookies/useCookie';

// Cards
import MemberCard from '../../cards/teams/memberCard';

// Views
import MemberPermissions from '../../views/teams/memberPermissions';

function MemberManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(5);
  const [cookieValue, setCookieValue, getCookieValue] = useEncryptedCookie('ni-uid');
  const [fetchingCookies, setFetchingCookies] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [memberPermissions, setMemberPermissions] = useState(false)

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    setFetchingCookies(true);
    getCookieValue();
    setFetchingCookies(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (cookieValue && !fetchingCookies) {
        axios
          .post(`/api/v1/team/all`, {
            pid: cookieValue.license[0]._id,
          }, config)
          .then(res => {
            setMembers(res.data.data);
          });
      }
    };

    fetchData();
  }, [cookieValue, fetchingCookies]);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(members.length / membersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = event => {
    setCurrentPage(Number(event.target.id));
  };

  return (
    <div>
      <h1 className="text-xl font-medium text-sky-700">Manage Permissions</h1>

      <div className="flex">
        <div className="flex-2 h-100 mt-10">
          {currentMembers.length > 0 ? (
            <div className="h-128" style={{width: '280px'}}>
              {currentMembers.map(mem => (
                <MemberCard key={mem.id} memberPermissions={memberPermissions} data={mem} members={members} setMemberPermissions={setMemberPermissions} setSelectedMember={setSelectedMember} selectedMember={selectedMember}/>
              ))}
            </div>
          ) : (
            <div className="w-full h-100 grid place-items-center">
              There are no team assigned to your group.
            </div>
          )}

          <div className="mt-4">
            <ul className="pagination flex w-72 justify-center">
              {pageNumbers.map(number => (
                <li key={number} className="page-item mr-4 text-white font-medium">
                  <button
                    className={currentPage === number ? 
                      "transition duration-400 hover:shadow-lg page-link pt-2 pb-2 pl-4 pr-4 shadow-md cursor-pointer rounded bg-sky-600"
                    :"transition duration-400 hover:shadow-lg page-link pt-2 pb-2 pl-4 pr-4 shadow-md cursor-pointer rounded bg-sky-500 hover:bg-sky-400"}
                    onClick={handleClick}
                    id={number}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PERMISSION VIEW */}
        <div className='flex-8'>
          {memberPermissions ? (
            <div className='w-full p-3'>
              <MemberPermissions selectedMember={selectedMember} setSelectedMember={setSelectedMember} setMemberPermissions={setMemberPermissions}/>
            </div>
          ):(
            <div className='w-full h-130 grid place-items-center rounded shadow-inner border-neutral-200 border bg-neutral-50'>
                <p className='text-lg text-neutral-700 p-3 rounded shadow-lg border border-neutral-200 bg-white'>
                  Select a team member to edit their permissions.
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberManagement;
