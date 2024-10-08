

//TODO: Look into https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API

export class Input
{
	#keyStates;
	#mouseButtons;
	#mouseX;
	#mouseY;
	#prevMouseX;
	#prevMouseY;
	#deltaMouseX;
	#deltaMouseY;
	#mouseWheel;
	#doubleClick;

	// For removal
	#boundFocusOutHandler;
	#boundContextMenuHandler;

	#boundKeyDownHandler;
	#boundKeyUpHandler;

	#boundDoubleClickHandler;
	#boundMouseDownHandler;
	#boundMouseUpHandler;
	#boundMouseMoveHandler;
	#boundMouseOutHandler;
	#boundMouseWheelHandler;

	constructor(element)
	{
		this.#keyStates = new Array(256).fill(false);
		this.#mouseButtons = new Array(5).fill(false);

		this.#mouseWheel = 0;
		this.#doubleClick = false;

		element.addEventListener("focusout", this.#boundFocusOutHandler = this.#FocusOutHandler.bind(this));
		element.addEventListener("contextmenu", this.#boundContextMenuHandler = this.#ContextMenuHandler.bind(this));

		element.addEventListener("keydown", this.#boundKeyDownHandler = this.#KeyDownHandler.bind(this));
		element.addEventListener("keyup", this.#boundKeyUpHandler = this.#KeyUpHandler.bind(this));

		element.addEventListener("dblclick", this.#boundDoubleClickHandler = this.#DoubleClickHandler.bind(this));
		element.addEventListener("pointerdown", this.#boundMouseDownHandler = this.#MouseDownHandler.bind(this));
		element.addEventListener("pointerup", this.#boundMouseUpHandler = this.#MouseUpHandler.bind(this));
		element.addEventListener("pointermove", this.#boundMouseMoveHandler = this.#MouseMoveHandler.bind(this));
		element.addEventListener("pointerout", this.#boundMouseOutHandler = this.#MouseOutHandler.bind(this));
		element.addEventListener("wheel", this.#boundMouseWheelHandler = this.#MouseWheelHandler.bind(this));
	}

	#ClearState()
	{
		this.#keyStates.fill(false);
		this.#mouseButtons.fill(false);
		this.#deltaMouseX = 0;
		this.#deltaMouseY = 0;
		this.#prevMouseX = this.#mouseX;
		this.#prevMouseY = this.#mouseY;
		this.#doubleClick = false;
	}

	#FocusOutHandler(e)
	{
		this.#ClearState();
	}

	#ContextMenuHandler(e)
	{
		e.preventDefault();
		return false; // Necessary?
	}

	EndOfFrame()
	{
		// Zero out the delta
		this.#deltaMouseX = 0;
		this.#deltaMouseY = 0;

		this.#mouseWheel = 0;
		this.#doubleClick = false;
	}

	// ------------------------------
	// ------------ Keys ------------
	// ------------------------------

	#KeyDownHandler(e)
	{
		this.#keyStates[e.keyCode] = true;
	}

	#KeyUpHandler(e)
	{
		this.#keyStates[e.keyCode] = false;
	}

	IsKeyDown(key)
	{
		// Validate key
		if (!(key instanceof Keys))
			console.log("Invalid key type - Use Key class static members");

		// If we've lost focus, clear the whole input
		if (!document.hasFocus())
			this.#ClearState();

		return this.#keyStates[key.KeyCode];
	}

	IsKeyUp(key)
	{
		return !this.IsKeyDown(key);
	}

	// ------------------------------
	// ------------ Mouse -----------
	// ------------------------------

	#DoubleClickHandler(e)
	{
		this.#doubleClick = true;
	}

	#MouseDownHandler(e)
	{
		this.#mouseButtons[e.button] = true;
	}

	#MouseUpHandler(e)
	{
		this.#mouseButtons[e.button] = false;
	}

	#MouseMoveHandler(e)
	{
		// Add to the overall delta
		this.#deltaMouseX += e.clientX - this.#mouseX;
		this.#deltaMouseY += e.clientY - this.#mouseY;

		// Save new mouse data
		this.#mouseX = e.clientX;
		this.#mouseY = e.clientY;
	}

	#MouseOutHandler(e)
	{
		this.#mouseButtons.fill(false);
	}

	#MouseWheelHandler(e)
	{
		this.#mouseWheel = e.deltaY;
	}

	IsMouseDown(button)
	{
		// Validate key
		if (!(button instanceof MouseButtons))
			console.log("Invalid button type - Use MouseButton class static members");

		// If we've lost focus, clear the whole input
		if (!document.hasFocus())
			this.#ClearState();

		return this.#mouseButtons[button.ButtonCode];
	}

	IsMouseUp(button)
	{
		return !this.IsMouseDown(button);
	}

	GetMouseX() { return this.#mouseX; }
	GetMouseY() { return this.#mouseY; }
	GetMouseDeltaX() { return this.#deltaMouseX; }
	GetMouseDeltaY() { return this.#deltaMouseY; }
	GetMouseWheel() { return this.#mouseWheel; }
	GetDoubleClick() { return this.#doubleClick; }
}

export class Keys
{
	static Backspace = new Keys(8);
	static Tab = new Keys(9);
	static Enter = new Keys(13);
	static Shift = new Keys(16);
	static Ctrl = new Keys(17);
	static Alt = new Keys(18);
	static PauseBreak = new Keys(19);
	static CapsLock = new Keys(20);
	static Escape = new Keys(27);
	static PageUp = new Keys(33);
	static Space = new Keys(32);
	static PageDown = new Keys(34);
	static End = new Keys(35);
	static Home = new Keys(36);
	static Left = new Keys(37);
	static Up = new Keys(38);
	static Right = new Keys(39);
	static Down = new Keys(40);
	static PrintScreen = new Keys(44);
	static Insert = new Keys(45);
	static Delete = new Keys(46);
	static D0 = new Keys(48);
	static D1 = new Keys(49);
	static D2 = new Keys(50);
	static D3 = new Keys(51);
	static D4 = new Keys(52);
	static D5 = new Keys(53);
	static D6 = new Keys(54);
	static D7 = new Keys(55);
	static D8 = new Keys(56);
	static D9 = new Keys(57);
	static A = new Keys(65);
	static B = new Keys(66);
	static C = new Keys(67);
	static D = new Keys(68);
	static E = new Keys(69);
	static F = new Keys(70);
	static G = new Keys(71);
	static H = new Keys(72);
	static I = new Keys(73);
	static J = new Keys(74);
	static K = new Keys(75);
	static L = new Keys(76);
	static M = new Keys(77);
	static N = new Keys(78);
	static O = new Keys(79);
	static P = new Keys(80);
	static Q = new Keys(81);
	static R = new Keys(82);
	static S = new Keys(83);
	static T = new Keys(84);
	static U = new Keys(85);
	static V = new Keys(86);
	static W = new Keys(87);
	static X = new Keys(88);
	static Y = new Keys(89);
	static Z = new Keys(90);
	static LeftWindows = new Keys(91);
	static RightWindows = new Keys(92);
	static Select = new Keys(93);
	static Numpad0 = new Keys(96);
	static Numpad1 = new Keys(97);
	static Numpad2 = new Keys(98);
	static Numpad3 = new Keys(99);
	static Numpad4 = new Keys(100);
	static Numpad5 = new Keys(101);
	static Numpad6 = new Keys(102);
	static Numpad7 = new Keys(103);
	static Numpad8 = new Keys(104);
	static Numpad9 = new Keys(105);
	static NumpadMultiply = new Keys(106);
	static NumpadAdd = new Keys(107);
	static NumpadSubtract = new Keys(109);
	static NumpadDecimalPoint = new Keys(110);
	static NumpadDivide = new Keys(111);
	static F1 = new Keys(112);
	static F2 = new Keys(113);
	static F3 = new Keys(114);
	static F4 = new Keys(115);
	static F5 = new Keys(116);
	static F6 = new Keys(117);
	static F7 = new Keys(118);
	static F8 = new Keys(119);
	static F9 = new Keys(120);
	static F10 = new Keys(121);
	static F11 = new Keys(122);
	static F12 = new Keys(123);
	static NumLock = new Keys(144);
	static ScrollLock = new Keys(145);
	static MyComputer = new Keys(182);
	static MyCalculator = new Keys(183);
	static Semicolon = new Keys(186);
	static Equals = new Keys(187);
	static Comma = new Keys(188);
	static Dash = new Keys(189);
	static Period = new Keys(190);
	static ForwardSlash = new Keys(191);
	static OpenBracket = new Keys(219);
	static BackSlash = new Keys(220);
	static CloseBraket = new Keys(221);
	static SingleQuote = new Keys(222);

	get KeyCode() { return this.#keyCode }

	#keyCode;
	constructor(keyCode)
	{
		this.#keyCode = keyCode;
	}
}


export class MouseButtons
{
	static Left = new MouseButtons(0);
	static Middle = new MouseButtons(1);
	static Right = new MouseButtons(2);
	static Button4 = new MouseButtons(3);
	static Button5 = new MouseButtons(4);

	get ButtonCode() { return this.#buttonCode }

	#buttonCode;
	constructor(buttonCode)
	{
		this.#buttonCode = buttonCode;
	}
}