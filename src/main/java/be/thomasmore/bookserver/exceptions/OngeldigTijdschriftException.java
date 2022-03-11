package be.thomasmore.bookserver.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.List;

public class OngeldigTijdschriftException extends ResponseStatusException {
    private List<String> foutomschrijvingen=new ArrayList<>();

    public OngeldigTijdschriftException(HttpStatus status){
        super(status);
    }

    public void voegFoutomschrijvingToe(String foutomschrijving){
        foutomschrijvingen.add(foutomschrijving);
    }

    public String toString(){
        String str="";
        for(String foutomschrijving : foutomschrijvingen)
            str+= foutomschrijving;
        return str;
    }
}
