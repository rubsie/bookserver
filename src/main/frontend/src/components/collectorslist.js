import {usePCollectorsContext} from "../contexts/collectorscontext";

export function CollectorList(props) {
    const {collectors} = usePCollectorsContext();

    function Album(props) {
        const {album} = props;
        return <div>
            <p>{album.titel}</p>
        </div>
    }

    function Collector(props) {
        const {collector} = props;

        return <div id='collectors'>
            <h3>{collector.naam}</h3>
            <div>{collector.stripalbums.map(s => <Album album={s} key={s.id}/>)}</div>
        </div>
    }

    return <>
        <h1>Verzamelaars</h1>
        {collectors.map(c => <Collector collector={c} key={c.naam}/>)}
    </>
}