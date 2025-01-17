import { SubmitHandler, useForm } from "react-hook-form";
//import { styled } from "styled-components";

interface IForm {
  toDo: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}
function JoinUserForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@gmail.com",
    },
  });

  const onValid: SubmitHandler<IForm> = (data, event) => {
    console.log(data);

    if (
      data.email.toLocaleLowerCase() ===
      "devKyeong@gmail.com".toLocaleLowerCase()
    ) {
      setError(
        "email",
        { message: "This email already exists." },
        { shouldFocus: true }
      );
    }
    //setError("extraError", { message: "Server is not connected.." });
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        type="text"
        placeholder="Email"
        {...register("email", {
          required: "Input Email",
          pattern: {
            value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g,
            message: "Email format is incorrect",
          },
        })}
      />
      {isSubmitted && <h3>{errors?.email?.message}</h3>}
      <input
        type="text"
        placeholder="First Name"
        {...register("firstName", {
          required: "Input First Name",
          validate: {
            duplication: (value) =>
              !value.includes("cosoon") || `${value} is already used`,
            noNico: (value) => !value.includes("nico") || `niconiconico`,
          },
        })}
      />
      {isSubmitted && <h3>{errors?.firstName?.message}</h3>}
      <input
        type="text"
        placeholder="Last Name"
        {...register("lastName", {
          required: "Input Last Name",
        })}
      />
      {isSubmitted && <h3>{errors?.lastName?.message}</h3>}
      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Input Password",
          minLength: { value: 8, message: "Too short" },
          maxLength: { value: 20, message: "Too long" },
          pattern: {
            value: /^[A-Za-z0-9]/g,
            message: "Password format is incorrect (English leter and Number)",
          },
        })}
      />
      {isSubmitted && <h3>{errors?.password?.message}</h3>}
      <input
        type="password"
        placeholder="password check"
        {...register("passwordCheck", {
          required: "Input passwordCheck",
          validate: (value, formValues) => {
            return formValues.password === value || "password inccorect";
          },
        })}
      />
      <button>Join</button>
      {isSubmitted && <h3>{errors?.extraError?.message}</h3>}
    </form>
  );
}

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   width: 200px;
//   margin: 20px auto;

//   input {
//     display: box;
//     height: 30px;
//   }
//   h3 {
//     font-size: 12px;
//     font-weight: 400;
//     color: tomato;
//   }
// `;

export default JoinUserForm;
