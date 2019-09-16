package com.max.myserver.appbl;

import com.max.myserver.data.RequestInput;
import com.max.myserver.data.Result;

public abstract class Action {
	public abstract Result getData(RequestInput input);
}
