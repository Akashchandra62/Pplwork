const App = () => {
    const [users, setUsers] = React.useState([]);
    const [isDisable, setisDisable] = React.useState(false);
    const [form, setForm] = React.useState({
        name: "",
        email: ""
    });

    React.useEffect(() => {
        fetchUser();
    }, []);

    function fetchUser() {
        fetch("/user")
            .then((res) => res.json())
            .then(data => {
                // console.log(data);
                setUsers(data);
            })
    }

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(form);
        if (!form.name || !form.email) {
            return;
        }

        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                fetchUser();

            })
        setForm({
            name: "",
            email: ""
        })
        setisDisable(false);

    }

    function updateForm(e, field) {
        // e.preventDefault();
        setForm({ ...form, [field]: e.target.value });
    }
    function handleEdit(id) {
        // console.log(id);
        fetch(`/edit/${id}`)
            .then(res => res.json())
            .then(data => {
                setForm({
                    name: data.user.name,
                    email: data.user.email
                })
            })
        setisDisable(true)

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Create New Employee</h2>
                <div>
                    <input type="text" value={form.name} onChange={() => updateForm(event, 'name')} className="form-control mt-2" placeholder="Enter the Employee name" />
                </div>
                <div>
                    <input type="email" value={form.email} disabled={isDisable} onChange={() => updateForm(event, 'email')} className="form-control mt-2" placeholder="Enter the Employee email" />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <main>
                <table>
                    <thead>
                        <tr>
                            <th>S. No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Id</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody className="details">
                        {
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.id}</td>
                                    <td><svg onClick={() => handleEdit(user._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg></td>
                                </tr>
                            ))
                        }
                        {/* <tr>
                    <td>1</td>
                    <td>Akash chandra</td>
                    <td>akashchandra8544@gmail.com</td>
                    <td>12345</td>
                </tr> */}
                    </tbody>
                </table>
            </main>
        </>
    )
}


ReactDOM.render(<App />, document.getElementById("client"));
// createRoot.render(<App />, document.getElementById("client"));