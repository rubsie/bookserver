import {useGenresContext} from "../contexts/genresContext";

export function GenresList(){
    const {genres} = useGenresContext();

    function Genre(props){
        const {genre} = props;
        return <div>
            <p>{genre.name}</p>
        </div>
    }


    return <>
        <h1>genres</h1>
        {genres.map(g => <Genre genre={g} key={g.id}/>)}

    </>


}