using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace AttendanceSystem
{
	public partial class 信息查询窗口 : BaseForm
	{
		private const string ComboBoxDefaultValue = "任意";
		private IList<AbsentInfo> CurrentResults;

		public 信息查询窗口()
		{
			InitializeComponent();

			CurrentResults = new List<AbsentInfo>();
		}


		private void form5_Load(object sender, EventArgs e)
		{
			comboBox缺课类型.AddEnumValue<AbsentType>();
			cbbCourseTime.AddEnumValue<CourseTime>();

			comboBox缺课类型.Items.Add(ComboBoxDefaultValue);
			cbbCourseTime.Items.Add(ComboBoxDefaultValue);

			comboBox缺课类型.SelectedText = ComboBoxDefaultValue;
			cbbCourseTime.SelectedText = ComboBoxDefaultValue;

			var col = dgvResults.Columns["AbsentType"] as DataGridViewComboBoxColumn;
			col.DataSource = Enum.GetValues(typeof (AbsentType));
			//
			col = dgvResults.Columns["CourseTime"] as DataGridViewComboBoxColumn;
			col.DataSource = Enum.GetValues(typeof (CourseTime));

			BindResultsToView();

			dgvResults.DataError += (o, args) => { args.ThrowException = false; };
		}

		private void button2_Click(object sender, EventArgs e)
		{
			Close();
		}

		private void button1_Click(object sender, EventArgs e)
		{
			AbsentType? absentType = comboBox缺课类型.TryGetValueAsEnum<AbsentType>();
			CourseTime? courseTime = cbbCourseTime.TryGetValueAsEnum<CourseTime>();

			string name = txtBox姓名.Text.Trim();
			string courseName = txtBox课程.Text.Trim();

			DateTime startTime = dtpStart.Value;
			DateTime endTime = dtpEnd.Value;

			IEnumerable<AbsentInfo> results = from student in AbsentInfoDAO.DAO.GetAll()
				select student;
			var reports = new StringBuilder();
			reports.Append("查询：\n ");

			if (absentType != null)
			{
				var list = new List<AbsentInfo>();
				foreach (AbsentInfo s in results)
					if (s.AbsentType == absentType)
						list.Add(s);
				results = list;

				reports.AppendFormat("\t缺课类型为： '{0}'\n", absentType);
			}
			if (courseTime != null)
			{
				results = results.Where(s => s.CourseTime == courseTime);
				reports.AppendFormat("\t课程时间为为： '{0}'\n", courseTime);
			}

			if (name.Length > 0)
			{
				results = results.Where(s => s.StudentName == name);
				reports.AppendFormat("\t姓名为： '{0}'\n", name);
			}


			if (courseName.Length > 0)
			{
				results = results.Where(s => s.CourseName == courseName);
				reports.AppendFormat("\t课程为： '{0}'\n", courseName);
			}


			if (chkEnableTimeLimit.Checked)
			{
				results = results.Where(s =>
				{
					DateTime time = s.AbsentDate;
					/*
					if (false == DateTime.TryParse(s.缺课日期, out time))
					{
						timeFormatInvalid = true;
						MessageBox.Show("学生数据时间格式错误。");
						return true;
					}
					*/
					return time > startTime && time < endTime;
				});

				reports.AppendFormat("且在时间段 {0}={1} \n", startTime, endTime);
			}


			reports.AppendLine("如下：")
				.AppendFormat("在{0}条数据中查找到 {1} 条数据\n", AbsentInfoDAO.DAO.GetAll().Count, results.Count());


			/*
			string format = "学生：{0} 缺课时间：{1} 缺课类型： {2} 缺课课程： {3}";
			foreach (AbsentInfo s in results)
			{
				reports.AppendFormat(format, s.StudentName, s.AbsentDate, s.AbsentType, s.CourseName)
					.AppendLine();
			}
			*/

			CurrentResults = results.ToList();
			BindResultsToView();

			output.Text = reports.ToString();
		}

		private void BindResultsToView()
		{
			dgvResults.AutoGenerateColumns = false;

			var bindingList = new BindingList<AbsentInfo>(CurrentResults);
			dgvResults.DataSource = bindingList;
		}

		private void btnAddInfo_Click(object sender, EventArgs e)
		{
			var f = new 信息窗体();
			f.ShowDialog();
		}

		private void dgvResults_CellEndEdit(object sender, DataGridViewCellEventArgs e)
		{
			Console.WriteLine("dgvResults_CellEndEdit");
		}


		private void SaveResults()
		{
			AbsentInfoDAO.DAO.SaveInfo(CurrentResults);
			Log("已保存更改.");
		}

		private void dgvResults_CellValidating(object sender, DataGridViewCellValidatingEventArgs e)
		{
			var dgv = (sender as DataGridView);
			DataGridViewColumn col = dgv.Columns[e.ColumnIndex];
			DataGridViewRow row = dgv.Rows[e.RowIndex];
			DataGridViewCell cell = row.Cells[e.ColumnIndex];

			cell.ErrorText = row.ErrorText = string.Empty;
			if (col.Name == "StudentName" || col.Name == "CourseName")
			{
				var val = cell.Value as String;
				if (string.IsNullOrWhiteSpace(val))
				{
					cell.ErrorText = "该值不能为空";
				}
			}
		}

		private void dgvResults_RowsAdded(object sender, DataGridViewRowsAddedEventArgs e)
		{
			var dgv = (sender as DataGridView);
			DataGridViewRow row = dgv.Rows[e.RowIndex];
			if (row.IsNewRow)
				SaveResults();
		}

		public void Log(string format, params object[] objs)
		{
			output.Text += string.Format(format, objs);
			output.Text += "\n";
		}

		private void 信息查询窗口_FormClosing(object sender, FormClosingEventArgs e)
		{
			AbsentInfoDAO.DAO.SaveToFile();
		}

		private void dgvResults_UserDeletingRow(object sender, DataGridViewRowCancelEventArgs e)
		{
			AbsentInfoDAO.DAO.GetAll().Remove(CurrentResults[e.Row.Index]);
		}
	}
}