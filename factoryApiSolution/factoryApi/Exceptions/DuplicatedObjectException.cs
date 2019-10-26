using System;

namespace factoryApi.Exceptions
{
    public class DuplicatedObjectException : Exception
    {
        public DuplicatedObjectException()
        {
        }

        public DuplicatedObjectException(string message) : base(message)
        {
        }
    }
}