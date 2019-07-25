//
// Copyright ?2002-2004 Rui Godinho Lopes <rui@ruilopes.com>
// All rights reserved.
//
// This source file(s) may be redistributed unmodified by any means
// PROVIDING they are not sold for profit without the authors expressed
// written consent, and providing that this notice and the authors name
// and all copyright notices remain intact.
//
// Any use of the software in source or binary forms, with or without
// modification, must include, in the user documentation ("About" box and
// printed documentation) and internal comments to the code, notices to
// the end user as follows:
//
// "Portions Copyright ?2002-2004 Rui Godinho Lopes"
//
// An email letting me know that you are using it would be nice as well.
// That's not much to ask considering the amount of work that went into
// this.
//
// THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
// EXPRESS OR IMPLIED. USE IT AT YOUT OWN RISK. THE AUTHOR ACCEPTS NO
// LIABILITY FOR ANY DATA DAMAGE/LOSS THAT THIS PRODUCT MAY CAUSE.
//

using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using AttendanceSystem;


/// <para>Your PerPixel form should inherit this class</para>
/// <author><name>Rui Godinho Lopes</name><email>rui@ruilopes.com</email></author>
public class PerPixelAlphaForm : Form
{
	public PerPixelAlphaForm()
	{
		// This form should not have a border or else Windows will clip it.
		FormBorderStyle = FormBorderStyle.None;
	}


	/// <para>Changes the current bitmap.</para>
	public void SetBitmap(Bitmap bitmap)
	{
		SetBitmap(bitmap, 255);
	}


	/// <para>Changes the current bitmap with a custom opacity level.  Here is where all happens!</para>
	public void SetBitmap(Bitmap bitmap, byte opacity)
	{
		if (bitmap.PixelFormat != PixelFormat.Format32bppArgb)
			throw new ApplicationException("The bitmap must be 32ppp with alpha-channel.");

		// The ideia of this is very simple,
		// 1. Create a compatible DC with screen;
		// 2. Select the bitmap with 32bpp with alpha-channel in the compatible DC;
		// 3. Call the UpdateLayeredWindow.

		IntPtr screenDc = Win32.GetDC(IntPtr.Zero);
		IntPtr memDc = Win32.CreateCompatibleDC(screenDc);
		IntPtr hBitmap = IntPtr.Zero;
		IntPtr oldBitmap = IntPtr.Zero;

		try {
			hBitmap = bitmap.GetHbitmap(Color.FromArgb(0));  // grab a GDI handle from this GDI+ bitmap
			oldBitmap = Win32.SelectObject(memDc, hBitmap);

			Win32.Size size = new Win32.Size(bitmap.Width, bitmap.Height);
			Win32.Point pointSource = new Win32.Point(0, 0);
			Win32.Point topPos = new Win32.Point(Left, Top);
			Win32.BLENDFUNCTION blend = new Win32.BLENDFUNCTION();
			blend.BlendOp             = Win32.AC_SRC_OVER;
			blend.BlendFlags          = 0;
			blend.SourceConstantAlpha = opacity;
			blend.AlphaFormat         = Win32.AC_SRC_ALPHA;

			Win32.UpdateLayeredWindow(Handle, screenDc, ref topPos, ref size, memDc, ref pointSource, 0, ref blend, Win32.ULW_ALPHA);
		}
		finally {
			Win32.ReleaseDC(IntPtr.Zero, screenDc);
			if (hBitmap != IntPtr.Zero) {
				Win32.SelectObject(memDc, oldBitmap);
				//Windows.DeleteObject(hBitmap); // The documentation says that we have to use the Windows.DeleteObject... but since there is no such method I use the normal DeleteObject from Win32 GDI and it's working fine without any resource leak.
				Win32.DeleteObject(hBitmap);
			}
			Win32.DeleteDC(memDc);
		}
	}


	protected override CreateParams CreateParams
	{
		get {
			CreateParams cp = base.CreateParams;
			cp.ExStyle |= 0x00080000; // This form has to have the WS_EX_LAYERED extended style
			return cp;
		}
	}
}
