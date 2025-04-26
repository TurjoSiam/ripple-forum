
const Contact = () => {
    return (
        <div className="w-full my-16 mx-auto">
            <h2 className="text-2xl font-bold text-center">Contact Us</h2>
            <form className="card-body lg:w-8/12 w-10/12 mx-auto">
            {/* name field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Enter your name" className="input input-bordered" required />
                </div>
                {/* email field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                {/* query field */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Query</span>
                    </label>
                    <textarea type="text" name="message" placeholder="Write your query" className="input input-bordered min-h-20" required />
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn-main">Send</button>
                </div>
            </form>
        </div>
    );
};

export default Contact;