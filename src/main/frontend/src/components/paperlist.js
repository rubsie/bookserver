import {usePapersContext} from "../contexts/paperscontext";

export function PaperList(props) {
    const {papers}=usePapersContext();

    function Paper(props){
        const {paper}=props;

        return <div>
            <h3>{paper.naam}</h3>
            <p>Oplage {paper.oplage} exemplaren</p>
        </div>
    }

    return <>
        <h1>Kranten</h1>
        {papers.map(p => <Paper paper={p} key={p.id} />)}
    </>
}
