using System;
using System.Linq;
using System.Windows.Forms;

namespace AttendanceSystem
{
	public static class Extension
	{
		public static ComboBox BindEnumValue<TEnum>(this ComboBox item)
			where TEnum : struct, IConvertible
		{
			if (! typeof (TEnum).IsEnum)
				throw new Exception("Type error, should be Enum");

			item.DataSource = Enum.GetValues(typeof (TEnum));
			return item;
		}

		public static ComboBox AddEnumValue<TEnum>(this ComboBox item)
			where TEnum : struct, IConvertible
		{
			if (!typeof (TEnum).IsEnum)
				throw new Exception("Type error, should be Enum");

			item.Items.AddRange(Enum.GetValues(typeof (TEnum)).Cast<TEnum>().Select(p => p.ToString()).ToArray());
			return item;
		}

		public static TEnum GetValueAsEnum<TEnum>(this ComboBox item)
			where TEnum : struct, IConvertible
		{
			if (!typeof (TEnum).IsEnum)
				throw new Exception("Type error, should be Enum");

			return (TEnum) Enum.Parse(typeof (TEnum), item.Text);
		}

		public static TEnum? TryGetValueAsEnum<TEnum>(this ComboBox item)
			where TEnum : struct, IConvertible
		{
			try
			{
				return GetValueAsEnum<TEnum>(item);
			} catch (ArgumentException)
			{
				return null;
			}
		}

		/// <summary>
		///     判断枚举常量是否定义
		/// </summary>
		public static bool IsEnumDefined<T>(this T val)
			where T : struct, IConvertible
		{
			if (typeof (T).IsEnum)
				return Enum.IsDefined(typeof (T), val);

			return false;
		}
	}
}