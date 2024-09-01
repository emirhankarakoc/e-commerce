package com.karakoc.ecommerce.exceptions.general;

import com.karakoc.ecommerce.exceptions.RestException;
import lombok.Getter;
import org.springframework.http.HttpStatus;

public class NotfoundException extends RestException {
    @Getter
    private final HttpStatus httpStatus;

    public NotfoundException(String msg) {
        super(msg);
        this.httpStatus = HttpStatus.NOT_FOUND;
    }

    @Override
    public boolean equals(Object o) {
        return super.equals(o);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}