using System;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;

namespace AttendanceSystem
{
	public class BaseForm : Form
	{
		private bool _isDraging;

		public BaseForm()
		{
			// 双缓冲
			SetStyle(ControlStyles.DoubleBuffer, true);
			UpdateStyles();
		}

		protected override void OnLoad(EventArgs args)
		{
			base.OnLoad(args);

			// 无窗口边框
			FormBorderStyle = FormBorderStyle.None;


			if (LicenseManager.UsageMode != LicenseUsageMode.Designtime)
			{
				// 圆角边框
				Region = Region.FromHrgn(Win32.CreateRoundRectRgn(0, 0, Width, Height, 20, 20));
				// 居中
				CenterToScreen();
				// 阴影
				var f = new Dropshadow(this)
				{
					BorderRadius = 40,
					ShadowColor = Color.Blue
				};

				f.RefreshShadow();
			}


			//OnLocationChanged(new EventArgs());

			// 实现可拖动的form
			/*
			var lastPoint = new Point();
			var _isDraging = false;
			MouseDown += (sender, e) =>
			{
				_isDraging = true;
				lastPoint = e.Location;
			};
			MouseMove += (sender, e) =>
			{
				if (! _isDraging)
					return;

				int ox = e.X - lastPoint.X;
				int oy = e.Y - lastPoint.Y;
				Location = new Point(Location.X + ox, Location.Y + oy);
			};
			MouseUp += (sender, e) => { _isDraging = false; };
			*/
		}

		// Let Windows drag this form for us
		protected override void WndProc(ref Message m)
		{
			if (m.Msg == 0x0084 /*WM_NCHITTEST*/)
			{
				m.Result = (IntPtr) 2; // HTCLIENT
				return;
			}
			base.WndProc(ref m);
		}
	}
}