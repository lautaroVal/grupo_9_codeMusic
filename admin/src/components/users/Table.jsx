import React from "react";
//import { Paginator } from "./Paginator";
import { Row } from "./Row";

export const Table = ({users}) => {
  return (
    <>
      {/* <Paginator/> */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre Completo</th>
              <th scope="col">Email</th>
              <th scope="col">Rol</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <Row {...user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
     {/*  <Paginator/> */}
    </>
  );
};
