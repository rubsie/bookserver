import {useState} from "react";

export function CreateForm(props) {
    const {createBook} = props;
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [priceInEur, setPriceInEur] = useState("");

    return <div className="modalbox">
        <form onSubmit={(e) => {
            console.log("SUBMIT");
            createBook({title, author, priceInEur});
            e.preventDefault();
        }}>
            <div>new book</div>
            <div className="formrow">
                <label>title: </label>
                <input value={title} required
                       onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="formrow">
                <label>author: </label>
                <input value={author} required pattern="[a-zA-Z ]*" type="text"
                       onChange={(e) => setAuthor(e.target.value)}/>
            </div>
            <div className="formrow">
                <label>price (€): </label>
                <input value={priceInEur} type="number" min="0" max="2000"
                       onChange={(e) => setPriceInEur(parseInt(e.target.value) || null)}/>
            </div>
            <div className="formbuttonrow">
                <button>create</button>
            </div>
        </form>
    </div>;
}