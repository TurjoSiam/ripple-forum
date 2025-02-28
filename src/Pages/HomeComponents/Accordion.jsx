

const Accordion = () => {
    return (
        <div className="w-10/12 mx-auto my-16 text-black dark:text-black">
            <div className="collapse collapse-arrow bg-gray-50 ">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">What is Ripple?</div>
                <div className="collapse-content">
                    <p>Ripple is a community-driven Q&A platform where users can ask questions, share knowledge, upvote answers, and engage in discussions, similar to Quora.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-gray-50">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium"> How do upvotes and downvotes work?</div>
                <div className="collapse-content">
                    <p>Users can upvote helpful answers to increase their visibility and downvote misleading content. This ensures the best responses rise to the top.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-gray-50">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Can I edit or delete my posts?</div>
                <div className="collapse-content">
                    <p>Yes! You can edit or delete your own questions and answers anytime. However, deleted posts may not be recoverable.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-gray-50">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Is Ripple free to use?</div>
                <div className="collapse-content">
                    <p>Yes! Ripple is completely free to browse, ask, and answer questions. Some premium features may be introduced in the future.</p>
                </div>
            </div>
        </div>
    );
};

export default Accordion;