using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace AttendanceSystem
{
	public partial class 登录窗口 : BaseForm
	{
		public 登录窗口()
		{
			InitializeComponent();
			txtAccount.Text = "abc";
			txtPassword.Text = "123";
		}


		private void btnLogin_Click(object sender, EventArgs e)
		{
			if (txtAccount.Text == "")
			{
				MessageBox.Show("请输入用户名！");
				Focus();
				return;
			}
			if (txtPassword.Text == "")
			{
				MessageBox.Show("请输入密码！");
				Focus();
				return;
			}
			if (txtAccount.Text == "abc" && txtPassword.Text == "123")
			{
				var f = new 信息查询窗口();
				Hide();
				f.ShowDialog();
				Show();
				Focus();
				//this.Hide();
			}
		}

		private void button2_Click(object sender, EventArgs e)
		{
			if (
				MessageBox.Show("您确定要关闭吗？", "警告", MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button1) ==
				DialogResult.Yes)
				Close();
		}

		private void 登录窗口_Paint(object sender, PaintEventArgs e)
		{
			//GraphicsPath gp = new GraphicsPath();
			//gp.AddEllipse(ClientRectangle);

			//PathGradientBrush pgb = new PathGradientBrush(gp);

			//pgb.CenterPoint = new PointF(ClientRectangle.Width / 2,
			//                             ClientRectangle.Height / 2);
			//pgb.CenterColor = Color.Black;
			//pgb.SurroundColors = new Color[] { Color.White };

			//e.Graphics.FillPath(pgb, gp);

			//pgb.Dispose();
			//gp.Dispose();
		}

	}
}