import "./App.css";
import { Async } from "./Async";

export type employeeResponseType = {
  data: EmployeeType;
};

export type EmployeeType = {
  employee_name: string;
  employee_age: string;
};

function assertIsEmployeeType(
  data: unknown
): asserts data is employeeResponseType {
  if (typeof data != "object") {
    throw new Error("Invalid Response Type");
  }
}

const id = 1;

// Zamiast produktu użyłem pracownika, ponieważ pasowało mi pod publiczne api, dostępne pod adresem https://dummy.restapiexample.com/

function App() {
  const getEmployeeById = async (id: number): Promise<EmployeeType> => {
    const res = await fetch(
      `https://dummy.restapiexample.com/api/v1/employee/${id}`
    );

    const responseData = await res.json();
    assertIsEmployeeType(responseData);

    return Promise.resolve(responseData.data);
  };

  return (
    <div className="App">
      <Async action={() => getEmployeeById(id)}>
        {(employee) => (
          <div>
            <h1>{employee.employee_name}</h1>
            {employee.employee_age}
          </div>
        )}
      </Async>
    </div>
  );
}

export default App;
