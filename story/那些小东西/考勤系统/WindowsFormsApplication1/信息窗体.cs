using System;
using System.Windows.Forms;

namespace AttendanceSystem
{
	public partial class 信息窗体 : BaseForm
	{
		public readonly bool AddStuentMode = false;

		public 信息窗体(AbsentInfo currentAbsentInfo = null)
		{
			InitializeComponent();

			if (currentAbsentInfo == null)
			{
				CurrentAbsentInfo = new AbsentInfo();
				AddStuentMode = true;
			} else
				CurrentAbsentInfo = currentAbsentInfo;
		}

		public AbsentInfo CurrentAbsentInfo { get; private set; }


		private void form3_Load(object sender, EventArgs e)
		{
			Text += AddStuentMode ? "(添加信息)" : "(修改信息)";

			comboBoxCourseTime.BindEnumValue<CourseTime>();
			comboBoxCourseType.BindEnumValue<AbsentType>();

			if (!AddStuentMode)
			{
				comboBoxCourseTime.SelectedText = CurrentAbsentInfo.CourseTime.ToString();
				comboBoxCourseType.SelectedText = CurrentAbsentInfo.AbsentType.ToString();

				txtStudentName.Text = CurrentAbsentInfo.StudentName;
				txtCourseName.Text = CurrentAbsentInfo.CourseName;
				dtpTime.Value = CurrentAbsentInfo.AbsentDate;
			}
			//
			ActiveControl = txtStudentName;
		}

		private void SaveValueToCurrentStudent()
		{
			CurrentAbsentInfo.CourseTime = comboBoxCourseTime.GetValueAsEnum<CourseTime>();
			CurrentAbsentInfo.AbsentType = comboBoxCourseType.GetValueAsEnum<AbsentType>();

			CurrentAbsentInfo.StudentName = txtStudentName.Text;
			CurrentAbsentInfo.CourseName = txtCourseName.Text;
			CurrentAbsentInfo.AbsentDate = dtpTime.Value;
		}

		private void button1_Click(object sender, EventArgs e)
		{
			SaveValueToCurrentStudent();

			if (CurrentAbsentInfo.CourseName.Length == 0)
			{
				MessageBox.Show("缺课名称不能为空！");
				ActiveControl = txtCourseName;
				return;
			}
			if (CurrentAbsentInfo.StudentName.Length == 0)
			{
				MessageBox.Show("请输入学生姓名！");
				ActiveControl = txtStudentName;
				return;
			}
			// 保存更改 并写入到文件
			AbsentInfoDAO
				.DAO
				.SaveInfo(CurrentAbsentInfo)
				.SaveToFile();

			Close();
		}

		private void btnCancel_Click(object sender, EventArgs e)
		{
			Close();
		}
	}
}